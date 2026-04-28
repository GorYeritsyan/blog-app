import { redirect } from "next/navigation";
import ModalTrigger from "@/app/components/ui/modal/ModalTrigger";
import ModalContent from "@/app/components/ui/modal/ModalContent";
import ModalClose from "@/app/components/ui/modal/ModalClose";
import ModalSubmit from "@/app/components/ui/modal/ModalSubmit";
import Modal from "@/app/components/ui/modal/Modal";
import { deleteBlogPost } from "@/app/actions/actions";

export default function DeleteModalButton({ postId }: { postId: string }) {

    const handleDeleteBlogPost = async (postId: string) => {
        await deleteBlogPost(postId);
        redirect("/");
    }

    return (
        <Modal>
            <ModalTrigger variant="danger">
                Delete
            </ModalTrigger>
            <ModalContent title="Delete Blog Post" description="Are you sure you want to delete this blog post?">
                <ModalClose variant="outline">Close</ModalClose>
                <ModalSubmit variant="danger" action={() => handleDeleteBlogPost(postId)}>Yes, I'm sure</ModalSubmit>
            </ModalContent>
        </Modal>
    );
}