"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/trpc/react';
import React, { useState } from 'react';
interface CreateCalendarModalProps {
    onSave: (shortUrl: string) => void;
}

const CreateCalendarModal: React.FC<CreateCalendarModalProps> = ({ onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icalUrl, setIcalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const { mutate } = api.schedule.createCalendar.useMutation();
    
    const handleSave = () => {
        mutate({ name, description, icalUrl, shortUrl });
        onSave(shortUrl);
    };

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button>Create Calendar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Create Calendar</DialogTitle>
                <DialogDescription>
                    Fill in the details below to create a new calendar.
                </DialogDescription>
                <div className="form-group">
                    <label className="text-sm font-medium" htmlFor="name">Name</label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="text-sm font-medium" htmlFor="description">Description (markdown)</label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="text-sm font-medium" htmlFor="icalUrl">Ical URL</label>
                    <Input
                        type="text"
                        id="icalUrl"
                        value={icalUrl}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIcalUrl(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="text-sm font-medium" htmlFor="shortUrl">Short URL</label>
                    <Input
                        type="text"
                        id="shortUrl"
                        value={shortUrl}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShortUrl(e.target.value)}
                    />
                </div>
                <div className="form-actions flex justify-end ">
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCalendarModal;

