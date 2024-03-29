import React, {useState} from "react";
import Alert from 'react-bootstrap';

const Message = (props) => {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{props.message}</Alert.Heading>
          {/* <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p> */}
        </Alert>
      );
    }
  }

  export default Message;