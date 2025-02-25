"use client";
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/trpc/react';
import React, { useState } from 'react';

interface CreateCalendarModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (shortUrl: string) => void;
}

const CreateCalendarModal: React.FC<CreateCalendarModalProps> = ({ open, onOpenChange, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icalUrl, setIcalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const { mutate } = api.schedule.createCalendar.useMutation();
    
    const handleSave = () => {
        mutate({ name, description, icalUrl, shortUrl });
        onSave(shortUrl);
        onOpenChange(false);
    };

    return (
        <Modal isOpen={open} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2>Create Calendar</h2>
                            <p className="text-sm text-gray-500">
                                Fill in the details below to create a new calendar.
                            </p>
                        </ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleSave}>Save</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CreateCalendarModal;

