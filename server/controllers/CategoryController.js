import prisma from '../utils/PrismaClient.js'
import { z } from 'zod'


const categorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.array(z.string().min(1, 'Slug is required')).min(1, 'At least one slug is required'),
    description: z.string().optional()
})

export const createCategory = async (req, res) => {
    // Validate request body
    if (!req.body) {
        return res.status(400).json({
            message: 'Category data is required'
        })
    }
    const validateCategory = categorySchema.safeParse(req.body)
    // console.log(validateCategory)
    if (!validateCategory.success) {
        return res.status(400).json({
            message: 'Invalid category data',
            errors: validateCategory
        })
    }
    const { name, slug, description} = validateCategory.data
    try {
        const category = await prisma.category.create({
            data: {
                name,
                slug, 
                description
            }
        })
        if (!category) {
            return res.status(400).json({
                message: 'Category creation failed'
            })
        }
       return res.status(201).json({
            message: 'Category created successfully',
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating category',
            error: error.message
        })
    }
}

export const getAllCategories = async (req, res)=>{
    try {
        const categories = await prisma.category.findMany({})
        if(!categories || categories.length === 0) {
            return res.status(404).json({
                message: 'No categories found'
            })
        }
        // console.log(categories)
        return res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching categories',
            error: error.message
        })
    }
}

