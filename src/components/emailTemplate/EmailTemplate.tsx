import { ICartOrder } from "@/shared/types/type";
import { Html, Heading, Img, Container, Font, Head, Section, Text, Body, Row, Column } from "@react-email/components";

interface EmailTemplateProps {
    id: string;
    name: string;
    comment: string;
    surname: string;
    email: string;
    phone: string;
    cartOrder: ICartOrder[];
}

const main = {
    background: "#fff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const content = {
    background: "linear-gradient(135deg, #ffcc00, #ffa500)",
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
};

const boxInfos = {
    padding: "0 20px",
    maxWidth: "600px",
    margin: "0 auto"
};

const paragraph = {
    fontSize: 16,
};
const containerOrder = {
    width: "100%",
};

export const EmailTemplate = ({ id, name, surname, email, phone, comment, cartOrder }: EmailTemplateProps) => {

    const renderOrder = (arr: ICartOrder[]) => {
        if (arr.length === 0) {
            return (
                <Text style={{ ...paragraph }}>
                    Client doesn't make any order
                </Text>
            )
        }

        return arr.map((item) => (
            <Row key={item.id} style={{ padding: "10px 20px", borderBottom: "1px solid #ddd" }}>
                <Column style={{ ...containerOrder }} >
                    <Img src={item.image} alt={item.title} width="100" height="100" style={{ objectFit: "cover", display: "block", margin: "0 auto" }} />
                    <Text style={{ ...paragraph, margin: "6px 0", lineHeight: 1.5 }}>
                        <b>Title: </b> <span style={{ fontSize: "14px" }}>{item.title}</span>
                    </Text>
                    <Text style={{ ...paragraph }}>
                        <b>Size: </b> {item.size}g
                    </Text>
                    <Text style={{ ...paragraph }}>
                        <b>Price: </b> <span style={{ display: "inline-block" }}>&#8364; {item.price}</span>
                    </Text>
                    <Text style={{ ...paragraph }}>
                        <b>Quantity: </b> <span style={{ display: "inline-block" }}>{item.qnt}</span>
                    </Text>
                </Column>
            </Row>
        ))
    }

    const order = renderOrder(cartOrder);

    return (

        <Html lang="en" dir="ltr">
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Body style={main}>
                <Container>
                    <Section style={content}>

                        <Row>
                            <Heading style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}>
                                You have received a new order!</Heading>
                            <Img src="https://res.cloudinary.com/dmrsemgsn/image/upload/v1737060831/bee_co0lfb.png" alt="bee" width="200" height="200" style={{ margin: "0 auto" }} />
                        </Row>

                        <Row>
                            <Column>
                                <Heading
                                    as="h2"
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}>
                                    From: {name}, {surname}
                                </Heading>
                            </Column>
                        </Row>

                        <Row style={{ ...boxInfos }}>

                            <Column>
                                <Heading
                                    as="h2"
                                    style={{
                                        fontSize: 26,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}>
                                    Contact information
                                </Heading>

                                <Text style={paragraph}>
                                    <b>Order №: </b>
                                    {id}
                                </Text>

                                <Text style={{ ...paragraph, marginTop: -5 }}>
                                    <b>Email: </b>
                                    <span style={{ fontSize: "14px" }}>{email}</span>
                                </Text>

                                <Text style={{ ...paragraph, marginTop: -5 }}>
                                    <b>Phone: </b>
                                    {phone}
                                </Text>
                            </Column>
                        </Row>

                        <Row>
                            <Column>
                                <Heading
                                    as="h3"
                                    style={{
                                        fontSize: 26,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}>
                                    Order Information
                                </Heading>
                            </Column>
                        </Row>

                        {/* <Row style={{ ...boxInfos, textAlign: "center" }}> */}
                        {order}
                        {/* </Row> */}

                        <Row>
                            <Column>
                                <Text style={{ ...paragraph, marginTop: "35px", padding: "0 20px" }}>
                                    <b>Comment: </b>
                                    {comment}
                                </Text>
                            </Column>
                        </Row>

                        <Text
                            style={{
                                marginTop: "10px",
                                textAlign: "center",
                                fontSize: 12,
                                color: "rgb(0,0,0, 0.7)",
                            }}
                        >
                            © 2025 | Germany | https://bienenhonig.vercel.app
                        </Text>

                    </Section>


                </Container>
            </Body>
        </Html>
    );
}

