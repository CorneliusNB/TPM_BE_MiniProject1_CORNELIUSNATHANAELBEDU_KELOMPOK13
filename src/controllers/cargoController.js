// 📂 FILE: src/controllers/cargoController.js

const prisma = require('../utils/prismaClient');
const { successResponse, errorResponse } = require('../utils/response');
const fs = require('fs');
const path = require('path');

// 1. CREATE
exports.createCargo = async (req, res) => {
    try {
        const { senderName, weight, planetId } = req.body;
        const file = req.file;

        if (!senderName || !weight || !planetId) {
            return errorResponse(res, "Data tidak lengkap!", 400);
        }

        const newCargo = await prisma.cargo.create({
            data: {
                receiptCode: `CRG-${Date.now()}`,
                senderName,
                weight: parseFloat(weight),
                planetId: parseInt(planetId),
                imagePath: file ? file.path : null // Simpan path gambar
            }
        });

        return successResponse(res, "Cargo berhasil dibuat", newCargo);
    } catch (error) {
        console.error(error);
        return errorResponse(res, "Gagal membuat cargo");
    }
};

// 2. READ (All with Pagination)
exports.getAllCargos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const cargos = await prisma.cargo.findMany({
            skip: skip,
            take: limit,
            include: { planet: true },
            orderBy: { createdAt: 'desc' }
        });

        const totalData = await prisma.cargo.count();

        return successResponse(res, "Data Cargo", cargos, {
            currentPage: page,
            totalPage: Math.ceil(totalData / limit),
            totalData
        });
    } catch (error) {
        return errorResponse(res, "Gagal mengambil data");
    }
};

// 3. READ (Detail by ID)
exports.getCargoById = async (req, res) => {
    try {
        const { id } = req.params;
        const cargo = await prisma.cargo.findUnique({
            where: { id: parseInt(id) },
            include: { planet: true }
        });

        if (!cargo) return errorResponse(res, "Cargo tidak ditemukan", 404);
        return successResponse(res, "Detail Cargo", cargo);
    } catch (error) {
        return errorResponse(res, "Error server");
    }
};

// 4. UPDATE
exports.updateCargo = async (req, res) => {
    try {
        const { id } = req.params;
        const { senderName, weight, status } = req.body;
        const file = req.file;

        const oldCargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
        if (!oldCargo) return errorResponse(res, "Data tidak ditemukan", 404);

        let updateData = {
            senderName,
            weight: weight ? parseFloat(weight) : undefined,
            status
        };

        if (file) {
            updateData.imagePath = file.path;
            // Hapus gambar lama
            if (oldCargo.imagePath && fs.existsSync(oldCargo.imagePath)) {
                fs.unlinkSync(oldCargo.imagePath);
            }
        }

        const updatedCargo = await prisma.cargo.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        return successResponse(res, "Cargo diupdate", updatedCargo);
    } catch (error) {
        return errorResponse(res, "Gagal update cargo");
    }
};

// 5. DELETE
exports.deleteCargo = async (req, res) => {
    try {
        const { id } = req.params;
        const cargo = await prisma.cargo.findUnique({ where: { id: parseInt(id) } });
        
        if (!cargo) return errorResponse(res, "Data tidak ditemukan", 404);

        if (cargo.imagePath && fs.existsSync(cargo.imagePath)) {
            fs.unlinkSync(cargo.imagePath);
        }

        await prisma.cargo.delete({ where: { id: parseInt(id) } });
        return successResponse(res, "Cargo dihapus", null);
    } catch (error) {
        return errorResponse(res, "Gagal menghapus");
    }
};
