# Gunakan base image untuk Node.js
FROM node:18

# Tentukan working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install semua dependencies
RUN npm install

# Salin seluruh folder proyek ke dalam container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port untuk API
EXPOSE 5500

# Jalankan aplikasi
CMD ["node", "src/index.js"]

# Salin file .env ke container
COPY .env /app/.env

