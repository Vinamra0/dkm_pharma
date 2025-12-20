export interface Product {
    id: string
    name: string
    category: string
    description: string
    image: string
    specifications: {
        composition: string
        dosageForm: string
        packaging: string
    }
}

export const products: Product[] = [
    // 1. Antibiotics
    {
        id: "prod_001",
        name: "Amoxyclav-625",
        category: "Tablets",
        description: "A broad-spectrum antibiotic used to treat various bacterial infections. Manufactured by DK Medi Group.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Amoxycillin 500mg + Clavulanic Acid 125mg",
            dosageForm: "Tablet",
            packaging: "10 x 6 Tablets (Alu-Alu)"
        }
    },
    {
        id: "prod_002",
        name: "Azithro-500",
        category: "Tablets",
        description: "Effective macrolide antibiotic for respiratory and throat infections.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Azithromycin 500mg",
            dosageForm: "Tablet",
            packaging: "10 x 3 Tablets (Blister)"
        }
    },
    {
        id: "prod_003",
        name: "Cefixime-200 LB",
        category: "Tablets",
        description: "Cephalosporin antibiotic with Lactic Acid Bacillus for gut health support.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Cefixime 200mg + Lactic Acid Bacillus",
            dosageForm: "Tablet",
            packaging: "10 x 10 Tablets (Alu-Alu)"
        }
    },

    // 2. Pain Relief
    {
        id: "prod_004",
        name: "Aceclofenac-P",
        category: "Tablets",
        description: "Combination NSAID for relief from pain, fever, and inflammation.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Aceclofenac 100mg + Paracetamol 325mg",
            dosageForm: "Tablet",
            packaging: "10 x 10 Tablets"
        }
    },
    {
        id: "prod_005",
        name: "Diclofenac Gel",
        category: "Topical",
        description: "Topical gel for quick relief from muscular pain and joint inflammation.",
        image: "https://images.unsplash.com/photo-1550572017-4fcdbb560209?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Diclofenac Diethylamine 1.16% w/w",
            dosageForm: "Gel",
            packaging: "30g Tube"
        }
    },
    {
        id: "prod_006",
        name: "Tramadol-SR",
        category: "Tablets",
        description: "Sustained-release analgesic for management of moderate to severe pain.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Tramadol Hydrochloride 100mg",
            dosageForm: "Tablet (SR)",
            packaging: "10 x 10 Tablets"
        }
    },

    // 3. Supplements
    {
        id: "prod_007",
        name: "Multi-Total Gold",
        category: "Capsules",
        description: "Comprehensive multivitamin with ginseng for immunity and daily energy.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Multivitamin + Multimineral + Antioxidants + Ginseng",
            dosageForm: "Softgel Capsule",
            packaging: "10 x 1 x 10 Softgels"
        }
    },
    {
        id: "prod_008",
        name: "Calcium-D3",
        category: "Tablets",
        description: "Essential supplement for bone health and calcium deficiency.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Calcium Carbonate 500mg + Vitamin D3 250 IU",
            dosageForm: "Tablet",
            packaging: "10 x 15 Tablets"
        }
    },
    {
        id: "prod_009",
        name: "Iron-Folic Syrup",
        category: "Syrup",
        description: "Hematinic syrup for anemia, safe for pregnancy and general weakness.",
        image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Ferrous Ascorbate + Folic Acid + Zinc",
            dosageForm: "Syrup",
            packaging: "200ml Bottle"
        }
    },

    // 4. Cardiac
    {
        id: "prod_010",
        name: "Telmisartan-40",
        category: "Tablets",
        description: "Medication for high blood pressure and heart failure management.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Telmisartan 40mg",
            dosageForm: "Tablet",
            packaging: "10 x 15 Tablets"
        }
    },
    {
        id: "prod_011",
        name: "Metformin-500 SR",
        category: "Tablets",
        description: "First-line medication for type 2 diabetes management.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Metformin Hydrochloride 500mg",
            dosageForm: "Tablet (SR)",
            packaging: "10 x 20 Tablets"
        }
    },
    {
        id: "prod_012",
        name: "Atorvastatin-10",
        category: "Tablets",
        description: "Lipid-lowering agent (statin) used to lower cholesterol and risk of heart disease.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Atorvastatin Calcium 10mg",
            dosageForm: "Tablet",
            packaging: "10 x 10 Tablets"
        }
    },

    // 5. Gastrointestinal
    {
        id: "prod_013",
        name: "Pantoprazole-DSR",
        category: "Capsules",
        description: "Relief from acidity, heartburn, and GERD symptoms.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Pantoprazole 40mg + Domperidone 30mg",
            dosageForm: "Capsule",
            packaging: "10 x 10 Capsules"
        }
    },
    {
        id: "prod_014",
        name: "Ondansetron Injection",
        category: "Injection",
        description: "Effective anti-emetic injection to prevent nausea and vomiting.",
        image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Ondansetron 2mg/ml",
            dosageForm: "Injection",
            packaging: "2ml Ampoule"
        }
    },

    // 6. Pediatrics
    {
        id: "prod_015",
        name: "Paracetamol Drops",
        category: "Drops",
        description: "Gentle pain and fever relief drops for infants.",
        image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Paracetamol 150mg/ml",
            dosageForm: "Oral Drops",
            packaging: "15ml Dropper Bottle"
        }
    }
];
