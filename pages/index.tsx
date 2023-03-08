import Form from "@/components/form";
import Layout from "@/components/layout";
import Output from "@/components/output";
import { IField } from "@/models/field";
import { useState } from "react";

export default function Home() {
    const [fields, setFields] = useState<Array<IField>>([
        {name: '', planValue: 0, factValue: 0},
        {name: '', planValue: 0, factValue: 0},
        {name: '', planValue: 0, factValue: 0},
    ])

    return (
        <Layout title="iDara">
            <Form fields={fields} setFields={setFields} />
            <Output fields={fields} />
        </Layout>
    )
}