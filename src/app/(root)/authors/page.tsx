import Container from "@/src/components/shared/Container";
import Search from "@/src/components/shared/Search";
import BlogPosts from "@/src/components/shared/BlogPosts";
import {fetchInstance} from "@/src/actions";


export default async function AuthorsPage() {
    const { data } = await fetchInstance("/users");
    const { items: users } = data;

    return (
        <section>
            <Container>
                <div className="flex flex-col gap-4">
                    <Search />

                    {/* Authors */}
                    {users.map(user => (
                        <div>{user.name}</div>
                    ))}
                </div>
            </Container>
        </section>
    )
}