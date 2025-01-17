import { Form, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";

type Props = {
    availableTags: Tag[];
    notes: Note[];
}


const Main = ({ availableTags, notes }: Props) => {

    const [query, setQuery] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);






    const filtredNotes = useMemo(
        () =>
            notes.filter(
                (note) =>
                    note.title.toLowerCase().includes(query.toLowerCase()) &&
                    selectedTags.every((s_tag) =>
                        note.tags.some((note_tag) => note_tag.value === s_tag.value)
                    )
            ),
        [query, selectedTags]
    );


    return (

        <Container className="mx-auto py-5">
            <Stack direction="horizontal"
                className="justify-content-between mb-4">
                <div className="d-flex gap-3 align-items-center">
                    <img width={45} src="/note_logo_2.png" alt="" />
                    <h1>Notlar</h1>
                </div>
                <Link to={"/new"}>
                    <Button> Olustur</Button>
                </Link>
            </Stack>

            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Basliga Gore Ara</Form.Label>
                            <Form.Control onChange={(e) => setQuery(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Etikete Gore Ara</Form.Label>
                            <ReactSelect
                                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                                options={availableTags}
                                isMulti
                                className="text-black" />

                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
                {
                    filtredNotes.map((note) => (
                        <Col key={note.id}>
                            <Card note={note} />
                        </Col>
                    ))
                }
            </Row>
        </Container>

    )
}

export default Main
