import { connection } from "../dataBaseConfig.js";
import {
    isValidBin, 
    isValidExpiryDate,
    isValidCVC,
} from "../utils/validators.js";
import {
    createPurchase,
    createPurchaseDetails,
    findUserByEmail,
} from "../models/purchaseModel.js"

export async function processPayment(req, res) {
    try {
        const { formData, paymentData, books, total} = req.body;

        const paymentMethod = req.body.paymentMethod || "card";
        if (paymentMethod == "card") {
            // Validaciones
            const bin = paymentData.cardNumber?.slice(0, 6);

            if (!isValidBin(bin)) {
                return res.status(400).json({ status: "rejected", reason: "Identificador bancario es inválido " });
            }

            if (!isValidExpiryDate(paymentData.expiryDate)) {
                return res.status(400).json({ status: "rejected", reason: "Tarjeta está por expirar o expirada" });
            }

            if (!isValidCVC(paymentData.cvv, paymentData.cardNumber)) {
                return res.status(400).json({ status: "rejected", reason: "CVC inválido" });
            }
        }

        const userId = await findUserByEmail(formData.email);

        const purchaseId = await createPurchase(userId, total);

        await createPurchaseDetails(purchaseId, books);

        return res.status(200).json({ status: "approved" });
    } catch (error) {
        console.error("❌ Error en proceso de pago:", error.message);
        return res.status(500).json({ status: "error", message: "No se ha podido procesar el pago",
        });
    }
}