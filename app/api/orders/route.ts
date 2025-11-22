import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('items.product');
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);
        const body = await req.json();

        // Validate stock for each item
        for (const item of body.items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.product}` }, { status: 404 });
            }

            // Find the specific variant
            const variant = product.variants.find((v: any) => v.size === item.size && v.color === item.color);

            if (!variant) {
                return NextResponse.json({ error: `Variant not found for product: ${product.name}` }, { status: 404 });
            }

            if (variant.stock < item.quantity) {
                return NextResponse.json({ error: `Insufficient stock for ${product.name} (${item.size}, ${item.color})` }, { status: 400 });
            }
        }

        // Decrement stock
        for (const item of body.items) {
            await Product.updateOne(
                { _id: item.product, "variants.size": item.size, "variants.color": item.color },
                { $inc: { "variants.$.stock": -item.quantity } }
            );
        }

        const orderData = {
            ...body,
            user: session?.user ? (session.user as any).id : undefined,
        };

        const order = await Order.create(orderData);
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
