import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import ReactSelect from "react-select/creatable"
import { Tag } from "../../types"
import { v4 } from "uuid"
import { CreateProps } from "../../pages/Create.tsx"
import Markdown from "react-markdown"




const CustomForm = ({
    createTag,
    handleSubmit,
    availableTags,
    title = "",
    markdown = "",
    tags = [],
}: CreateProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const navigate = useNavigate();

    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        const title = inputRef.current?.value as string;
        const markdown = textRef.current?.value as string;

        //yeni olusturulan notu state ve locale kaydet
        handleSubmit({
            title,
            markdown,
            tags: selectedTags,
        });
        navigate("/");
    }

    return (
        <Form onSubmit={handleForm} className="my-4">
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Baslik</Form.Label>
                        <Form.Control defaultValue={title} ref={inputRef} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Etiketler</Form.Label>
                        <ReactSelect
                            options={availableTags}
                            onChange={(allTags) => setSelectedTags(allTags as Tag[])}
                            onCreateOption={(text: string) => {
                                const newTag: Tag = { label: text, value: v4() };

                                createTag(newTag);
                                setSelectedTags([...selectedTags, newTag]);
                            }}
                            value={selectedTags}
                            className="text-black" isMulti />
                    </Form.Group>
                </Col>
            </Row>


            <Form.Group className="mt-4">
                <Form.Label>Icerik(markdown destekler)</Form.Label>
                <Form.Control defaultValue={markdown} ref={textRef} as="textarea" style={{ minHeight: "300px", maxHeight: "500px" }} />
            </Form.Group>

            <Stack direction="horizontal" className="justify-content-end mt-5" gap={4}>
                <Link to="..">
                    <Button type="button" variant="secondary">Geri</Button>
                </Link>
                <Button type="submit">Kaydet</Button>
            </Stack>

        </Form>
    )
}

export default CustomForm
