const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('admin123', 10)

    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password,
        },
    })

    console.log({ admin })

    // Seed Products
    const products = [
        {
            name: 'Paracetamol 500mg',
            genericName: 'Paracetamol',
            therapeuticCat: 'Analgesics',
            dosageForm: 'Tablets',
            strength: '500mg',
            manufacturer: 'DKM Pharma',
            description: 'Effective pain reliever and fever reducer.',
            composition: 'Each tablet contains Paracetamol IP 500mg',
            packaging: '10x10 Blister',
            sku: 'PARA500',
        },
        {
            name: 'Amoxicillin 250mg',
            genericName: 'Amoxicillin',
            therapeuticCat: 'Antibiotics',
            dosageForm: 'Capsules',
            strength: '250mg',
            manufacturer: 'DKM Pharma',
            description: 'Broad-spectrum antibiotic for bacterial infections.',
            composition: 'Each capsule contains Amoxicillin Trihydrate IP 250mg',
            packaging: '10x10 Strip',
            sku: 'AMOX250',
        },
        {
            name: 'Cetirizine 10mg',
            genericName: 'Cetirizine Hydrochloride',
            therapeuticCat: 'Antihistamines',
            dosageForm: 'Tablets',
            strength: '10mg',
            manufacturer: 'DKM Pharma',
            description: 'Relief from allergy symptoms like runny nose and sneezing.',
            composition: 'Each tablet contains Cetirizine HCl IP 10mg',
            packaging: '10x10 Alu-Alu',
            sku: 'CET10',
        },
        {
            name: 'Omeprazole 20mg',
            genericName: 'Omeprazole',
            therapeuticCat: 'Gastrointestinal',
            dosageForm: 'Capsules',
            strength: '20mg',
            manufacturer: 'DKM Pharma',
            description: 'Treats acid reflux and stomach ulcers.',
            composition: 'Each capsule contains Omeprazole IP 20mg',
            packaging: '10x10 Strip',
            sku: 'OME20',
        },
        {
            name: 'Metformin 500mg',
            genericName: 'Metformin Hydrochloride',
            therapeuticCat: 'Antidiabetic',
            dosageForm: 'Tablets',
            strength: '500mg',
            manufacturer: 'DKM Pharma',
            description: 'First-line medication for type 2 diabetes.',
            composition: 'Each tablet contains Metformin HCl IP 500mg',
            packaging: '10x15 Blister',
            sku: 'MET500',
        },
        {
            name: 'Cough Syrup',
            genericName: 'Dextromethorphan + Chlorpheniramine',
            therapeuticCat: 'Respiratory',
            dosageForm: 'Syrup',
            strength: '10mg/5ml',
            manufacturer: 'DKM Pharma',
            description: 'Relief from dry cough and throat irritation.',
            composition: 'Each 5ml contains Dextromethorphan HBr 10mg, Chlorpheniramine Maleate 2mg',
            packaging: '100ml Bottle',
            sku: 'COUGH100',
        },
        {
            name: 'Vitamin C 500mg',
            genericName: 'Ascorbic Acid',
            therapeuticCat: 'Nutraceuticals',
            dosageForm: 'Tablets',
            strength: '500mg',
            manufacturer: 'DKM Pharma',
            description: 'Immunity booster and antioxidant.',
            composition: 'Each chewable tablet contains Vitamin C 500mg',
            packaging: '10x10 Strip',
            sku: 'VITC500',
        },
        {
            name: 'Diclofenac Gel',
            genericName: 'Diclofenac Diethylamine',
            therapeuticCat: 'Pain Management',
            dosageForm: 'Topical',
            strength: '1.16%',
            manufacturer: 'DKM Pharma',
            description: 'Topical gel for joint and muscle pain relief.',
            composition: 'Diclofenac Diethylamine IP 1.16% w/w',
            packaging: '30g Tube',
            sku: 'DICLO30',
        }
    ]

    for (const product of products) {
        const p = await prisma.product.upsert({
            where: { sku: product.sku },
            update: {},
            create: product,
        })
        console.log(`Created product: ${p.name}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
