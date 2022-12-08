import "./App.css";
import { Alert, Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="container">
        <div className="row">
          <h4 className="mb-16 text-center" style={{ marginTop: 28 }}>
            Type what you want to see
          </h4>
          <Form onSubmit={handleSubmit} className="mb-8">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter Text"
              className="mb-4"
            >
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="name@example.com"
                required
                disabled={loading}
              />
            </FloatingLabel>
            {loading ? (
              <Button disabled>Getting Image...</Button>
            ) : (
              <Button type="submit">Generate</Button>
            )}
          </Form>
          {error ? <Alert variant={"danger"}>{error}</Alert> : null}
          {loading ? (
            <div className="text-center">
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} className="rounded-md" alt={text} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
