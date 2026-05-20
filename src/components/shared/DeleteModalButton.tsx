"use client";

import ModalTrigger from "@/src/components/ui/modal/ModalTrigger";
import ModalContent from "@/src/components/ui/modal/ModalContent";
import ModalClose from "@/src/components/ui/modal/ModalClose";
import ModalSubmit from "@/src/components/ui/modal/ModalSubmit";
import Modal from "@/src/components/ui/modal/Modal";
import { deleteBlogPost } from "@/src/actions/actions";

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