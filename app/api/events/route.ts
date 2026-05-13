import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import Event from "@/database/event.model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        let event;

        try {
            event = Object.fromEntries(formData.entries());

        } catch (error) {
            return NextResponse.json({ message: 'Invalid form data' }, { status: 400 })
        }

        const file = formData.get('image') as File;

        if(!file) return NextResponse.json({message: 'image file is required'}, {status: 400});

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'EventLoop'}, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);
        return NextResponse.json({ message: 'Event Created Successfully', event: createdEvent }, { status: 201 });

    } catch (e) {
        console.error('Error handling POST request:', e);
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });

    }
}


export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({message: 'Event Fetch failed', error: error}, {status: 500});
    }
}