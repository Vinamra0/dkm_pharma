const products = [
    // 1. Antibiotics
    {
        id: "prod_001",
        name: "Amoxyclav-625",
        packing: "10 x 6 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Amoxycillin 500mg + Clavulanic Acid 125mg",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Antibiotic", "Bacterial Infection", "Prescription"],
        generics: ["Amoxycillin", "Clavulanic Acid"],
        subCategory: "Anti-Infective",
        packageType: "Alu-Alu"
    },
    {
        id: "prod_002",
        name: "Azithro-500",
        packing: "10 x 3 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Azithromycin 500mg",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Antibiotic", "Throat Infection", "Respiratory"],
        generics: ["Azithromycin"],
        subCategory: "Macrolide",
        packageType: "Blister"
    },
    {
        id: "prod_003",
        name: "Cefixime-200 LB",
        packing: "10 x 10 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Cefixime 200mg + Lactic Acid Bacillus",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Antibiotic", "Gut Health", "Broad Spectrum"],
        generics: ["Cefixime", "Lactic Acid Bacillus"],
        subCategory: "Cephalosporin",
        packageType: "Alu-Alu"
    },

    // 2. Pain Relief & Anti-Inflammatory (Analgesics)
    {
        id: "prod_004",
        name: "Aceclofenac-P",
        packing: "10 x 10 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Aceclofenac 100mg + Paracetamol 325mg",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Pain Relief", "Fever", "Arthritis"],
        generics: ["Aceclofenac", "Paracetamol"],
        subCategory: "NSAID",
        packageType: "Blister"
    },
    {
        id: "prod_005",
        name: "Diclofenac Gel",
        packing: "30g Tube",
        image: "https://via.placeholder.com/150",
        composition: "Diclofenac Diethylamine 1.16% w/w",
        company: "DK Medi Group",
        category: "Topical",
        tags: ["Pain Relief", "Joint Pain", "Muscular"],
        generics: ["Diclofenac"],
        subCategory: "Topical Gel",
        packageType: "Tube"
    },
    {
        id: "prod_006",
        name: "Tramadol-SR",
        packing: "10 x 10 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Tramadol Hydrochloride 100mg (Sustained Release)",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Severe Pain", "Opioid Analgesic"],
        generics: ["Tramadol"],
        subCategory: "Analgesic",
        packageType: "Blister"
    },

    // 3. Nutritional Supplements & Multivitamins
    {
        id: "prod_007",
        name: "Multi-Total Gold",
        packing: "10 x 1 x 10 Softgels",
        image: "https://via.placeholder.com/150",
        composition: "Multivitamin + Multimineral + Antioxidants + Ginseng",
        company: "DK Medi Group",
        category: "Capsules",
        tags: ["Immunity", "Energy", "Daily Health"],
        generics: ["Vitamins", "Minerals", "Ginseng"],
        subCategory: "Softgel",
        packageType: "Bottle"
    },
    {
        id: "prod_008",
        name: "Calcium-D3",
        packing: "10 x 15 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Calcium Carbonate 500mg + Vitamin D3 250 IU",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Bone Health", "Calcium", "Vitamin D"],
        generics: ["Calcium", "Vitamin D3"],
        subCategory: "Supplement",
        packageType: "Strip"
    },
    {
        id: "prod_009",
        name: "Iron-Folic Syrup",
        packing: "200ml Bottle",
        image: "https://via.placeholder.com/150",
        composition: "Ferrous Ascorbate + Folic Acid + Zinc",
        company: "DK Medi Group",
        category: "Syrup",
        tags: ["Anemia", "Blood Health", "Pregnancy Safe"],
        generics: ["Iron", "Folic Acid"],
        subCategory: "Hematinic",
        packageType: "Bottle"
    },

    // 4. Cardiac & Diabetic Care
    {
        id: "prod_010",
        name: "Telmisartan-40",
        packing: "10 x 15 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Telmisartan 40mg",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Blood Pressure", "Hypertension", "Heart Health"],
        generics: ["Telmisartan"],
        subCategory: "Anti-Hypertensive",
        packageType: "Alu-Alu"
    },
    {
        id: "prod_011",
        name: "Metformin-500 SR",
        packing: "10 x 20 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Metformin Hydrochloride 500mg",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Diabetes", "Blood Sugar", "Metabolic"],
        generics: ["Metformin"],
        subCategory: "Anti-Diabetic",
        packageType: "Blister"
    },
    {
        id: "prod_012",
        name: "Atorvastatin-10",
        packing: "10 x 10 Tablets",
        image: "https://via.placeholder.com/150",
        composition: "Atorvastatin Calcium 10mg",
        company: "DK Medi Group",
        category: "Tablets",
        tags: ["Cholesterol", "Heart Health", "Statins"],
        generics: ["Atorvastatin"],
        subCategory: "Lipid Lowering",
        packageType: "Alu-Alu"
    },

    // 5. Gastrointestinal
    {
        id: "prod_013",
        name: "Pantoprazole-DSR",
        packing: "10 x 10 Capsules",
        image: "https://via.placeholder.com/150",
        composition: "Pantoprazole 40mg + Domperidone 30mg",
        company: "DK Medi Group",
        category: "Capsules",
        tags: ["Acidity", "Gastritis", "Reflux"],
        generics: ["Pantoprazole", "Domperidone"],
        subCategory: "PPI",
        packageType: "Alu-Alu"
    },
    {
        id: "prod_014",
        name: "Ondansetron Injection",
        packing: "2ml Ampoule",
        image: "https://via.placeholder.com/150",
        composition: "Ondansetron 2mg/ml",
        company: "DK Medi Group",
        category: "Injection",
        tags: ["Anti-Emetic", "Nausea", "Vomiting"],
        generics: ["Ondansetron"],
        subCategory: "Critical Care",
        packageType: "Ampoule"
    },

    // 6. Pediatrics
    {
        id: "prod_015",
        name: "Paracetamol Drops",
        packing: "15ml Bottle",
        image: "https://via.placeholder.com/150",
        composition: "Paracetamol 150mg/ml",
        company: "DK Medi Group",
        category: "Drops",
        tags: ["Fever", "Pain Relief", "Infant Care"],
        generics: ["Paracetamol"],
        subCategory: "Pediatric",
        packageType: "Dropper Bottle"
    }
];

export default products;