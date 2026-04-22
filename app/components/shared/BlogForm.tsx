import Form from "@/app/components/ui/Form";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function BlogForm() {
    return (
        <Form>
            <Input />
            <Input />
            <Input />
            <Button className="w-fit">Create</Button>
        </Form>
    );
}