import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { DeleteAlertProps } from "../types";
import { Button } from "./ui/button";

const DeleteAlert = ({ content, onDelete }: DeleteAlertProps) => {
    const [loading, setLoading] = useState(false);
    
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div>
            <p className="text-sm text-muted-foreground">{content}</p>
            <div className="flex justify-end mt-6">
                <Button
                    onClick={handleDelete}
                    disabled={loading}
                    variant="destructive"
                    className="flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        "Delete"
                    )}
                </Button>
            </div>
        </div>
    )
}

export default DeleteAlert;
