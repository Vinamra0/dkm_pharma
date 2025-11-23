const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('Checking database connection...')
    try {
        const count = await prisma.admin.count()
        console.log(`Found ${count} admin users.`)

        if (count === 0) {
            console.log('No admin users found. Please run: node prisma/seed.js')
        } else {
            const admin = await prisma.admin.findUnique({
                where: { username: 'admin' }
            })

            if (admin) {
                console.log('Admin user "admin" exists.')
                const isMatch = await bcrypt.compare('admin123', admin.password)
                console.log(`Password "admin123" match: ${isMatch}`)
                if (!isMatch) {
                    console.log('The password in the DB does not match "admin123". You might have changed it or the seed script used a different hash.')
                }
            } else {
                console.log('Admin user "admin" does NOT exist.')
            }
        }
    } catch (e) {
        console.error('Error connecting to database:', e.message)
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
