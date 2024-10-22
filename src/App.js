import './App.css';
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table
} from 'react-bootstrap';

function App() {

  const [students, setStudents] = useState([
    {
      id: 0,
      name: 'Nguyen Van A',
      code: 'CODE12345',
      status: 'active'
    },
    {
      id: 1,
      name: 'Tran Van B',
      code: 'CODE67890',
      status: 'in-active'
    },
  ]);

  const [student, setStudent] = useState({
    name: '',
    code: '',
    status: '',
  });

  const [numberStudents, setNumberStudents] = useState(0);
  const [checkedStudents, setCheckedStudents] = useState([]);

  useEffect(() => {
    setNumberStudents(checkedStudents.length);
  }, [checkedStudents])

  const handleChange = (e) => {
    let newStudent = {};
    if (e.target.name === 'status') {
      newStudent = {
        ...student,
        status: !student.status ? e.target.value : '',
      }
    }
    else {
      newStudent = {
        ...student,
        [e.target.name]: e.target.value,
      }
    }
    setStudent(newStudent);
  };

  console.log(student);

  const handleAdd = () => {
    student.id = students.length;
    setStudents(prev => [student, ...prev]);
    setStudent({ name: '', code: '', status: '' });
  };

  const handleDelete = (id) => {
    // let arr = [...students];
    // arr = arr.filter((item) => {
    //   return item.id !== id;
    // })
    // setStudents(arr);
    setStudents(prev => {
      prev = prev.filter((item) => {
        return item.id !== id
      });
      return prev;
    });
    setCheckedStudents(prev => (prev.filter((item) => (item !== id))))
  };

  console.log(checkedStudents);

  const handleCheckBox = (id) => {
    setCheckedStudents(prev => {
      if (prev.includes(id)) {
        return prev.filter((item) => (item !== id));
      }
      else {
        return [...prev, id];
      }
    });
  };

  const handleClear = () => {
    setStudents([]);
    setNumberStudents(0);
    setCheckedStudents([]);
  };

  return (
    <Container>
      <Row>
        <Col><h2>Total Selected Students: {numberStudents}</h2></Col>
        <Col><Button variant='primary' onClick={handleClear}>Clear</Button></Col>
      </Row>
      <Row className='mt-5 justify-content-center'>
        <Col md='6'>
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <Container>
              <Row>
                <Form.Group className="mb-3 p-0" controlId="studentName">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Student Name"
                    name='name'
                    value={student.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3 p-0" controlId='studentCode'>
                  <Form.Label>Student Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Enter Student Code'
                    name='code'
                    value={student.code}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Check
                  type='checkbox'
                  label='Still active'
                  name='status'
                  value='active'
                  checked={student.status}
                  onChange={handleChange}
                  id='status'
                />
              </Row>
              <Row className='justify-content-center'>
                <Col md='3'>
                  <Button className='mt-2' variant='primary' style={{ width: '100%' }} onClick={handleAdd}>Add</Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>

      </Row>
      <Row className='mt-5'>
        <div className='mb-2' style={{ textAlign: 'center' }}>
          <h2>Student List</h2>
        </div>
        <Table hover size="">
          <thead>
            <tr>
              <th>Select</th>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((student) => {
                return (
                  <tr key={student.id} >
                    <td>
                      <Form.Check
                        type='checkbox'
                        checked={checkedStudents.includes(student.id)}
                        onChange={() => handleCheckBox(student.id)}
                      />
                    </td>
                    <td>{student.name}</td>
                    <td>{student.code}</td>
                    <td>
                      {student.status !== 'active' ? (<Button variant='danger' disabled>In-Active</Button>) : (<Button variant='primary' disabled>Active</Button>)}
                    </td>
                    <td>
                      <Button variant='danger' onClick={() => handleDelete(student.id)}>Delete</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Row>
    </Container>
  )

}

export default App;
