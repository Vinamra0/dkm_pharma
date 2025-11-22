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
    {
        id: "1",
        name: "Paracetamol 500mg",
        category: "Tablets",
        description: "Effective pain reliever and fever reducer.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Paracetamol IP 500mg",
            dosageForm: "Tablet",
            packaging: "10x10 Blister",
        },
    },
    {
        id: "2",
        name: "Amoxicillin 250mg",
        category: "Antibiotics",
        description: "Broad-spectrum antibiotic for bacterial infections.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Amoxicillin Trihydrate IP eq. to Amoxicillin 250mg",
            dosageForm: "Capsule",
            packaging: "10x10 Strip",
        },
    },
    {
        id: "3",
        name: "Cough Syrup",
        category: "Syrups",
        description: "Relief from dry and wet cough.",
        image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Dextromethorphan HBr 10mg, Chlorpheniramine Maleate 2mg",
            dosageForm: "Syrup",
            packaging: "100ml Bottle",
        },
    },
    {
        id: "4",
        name: "Vitamin C Injection",
        category: "Injections",
        description: "For Vitamin C deficiency.",
        image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&q=80&w=800",
        specifications: {
            composition: "Ascorbic Acid IP 500mg",
            dosageForm: "Injection",
            packaging: "5ml Ampoule",
        },
    },
]
