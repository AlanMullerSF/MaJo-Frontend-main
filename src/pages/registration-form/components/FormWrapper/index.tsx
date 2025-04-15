import { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";

type FormWrapperProps = {
  children: ReactNode;
};

/**
 * A wrapper component for forms that provides a fluid container with a single column layout.
 * @param {FormWrapperProps} children - The child components to render within the form wrapper.
 * @returns The rendered form wrapper component.
 */
export default function FormWrapper({ children }: FormWrapperProps) {
  return (
    <Container fluid>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
