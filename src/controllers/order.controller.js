const { PrismaClient } = require("@prisma/client");
const ClientError = require("../errors/ClientError");
const passport = require('passport');
const prisma = new PrismaClient();
const {sendOrderNotification} = require('../MessageBroker');

const orderItem = async (req, res, next) => {
  try {
    const { barangId, jumlah } = req.body;
    const userId = req.user.id;
    const id = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');

    const isBarang = await prisma.barang.findUnique({
      where: { id: barangId },
    });

    const isCustomer = await prisma.customer.findUnique({
      where: { id: userId },
    });

    if (!isBarang) {
      return res.status(404).json({ message: "Barang tidak ditemukan." });
    }
    if (isBarang.jumlah < jumlah) {
      return res.status(400).json({ message: "Stok barang tidak cukup." });
    }
    if (!isCustomer || isCustomer.saldo < isBarang.harga * jumlah) {
      return res.status(400).json({ message: "Saldo Anda tidak cukup." });
    }

    const harga = jumlah * isBarang.harga;
    const status = "Pending";
    const createdAt = new Date();

    const [newOrder, updatedBarang, updatedCustomer] = await prisma.$transaction([
      prisma.order.create({
        data: {
          id,
          barangId,
          userId,
          status,
          jumlah,
          harga,
          createdAt,
        },
      }),
      prisma.barang.update({
        where: { id: barangId },
        data: { jumlah: { decrement: jumlah } }, 
      }),
      prisma.customer.update({
        where: { id: userId },
        data: { saldo: { decrement: harga } }, 
      }),
    ]);

    const messageOrder = {id ,barangId, jumlah, createdAt}
    await sendOrderNotification(messageOrder);

    res.status(201).json({
      message: "Order berhasil dibuat.",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memproses order.",
      error: error.message,
    });
  }
};

const getBarang = async (req, res, next) => {
  try {
    const barang = await prisma.barang.findMany({
    });

    if (!barang) {
      return res.status(404).json({
        message: "Barang not found",
      });
    }

    return res.status(200).json({
      message: "Success",
      data: barang, 
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  orderItem, getBarang
};
