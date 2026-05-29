"use client";

import ModalTrigger from "@/components/ui/modal/ModalTrigger";
import ModalContent from "@/components/ui/modal/ModalContent";
import ModalClose from "@/components/ui/modal/ModalClose";
import ModalSubmit from "@/components/ui/modal/ModalSubmit";
import Modal from "@/components/ui/modal/Modal";
import { deleteBlogPost } from "@/actions/actions";

export default function DeleteModalButton({ postId }: { postId: string }) {

    const handleDeleteBlogPost = async (postId: string) => {
        await deleteBlogPost(postId);
    }

    return (
        <Modal>
            <ModalTrigger variant="danger">
                Delete
            </ModalTrigger>
            <ModalContent title="Delete Blog Post" description="Are you sure you want to delete this blog post?">
                <ModalClose variant="outline">Close</ModalClose>
                <ModalSubmit variant="danger" onSubmit={() => handleDeleteBlogPost(postId)}>
                    Yes, I'm sure
                </ModalSubmit>
            </ModalContent>
        </Modal>
    );
}