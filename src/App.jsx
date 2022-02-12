// import "./App.scss";
import React, { useState, useEffect } from 'react';
import { DUMMY } from './dummies'
import { Layout, Menu, Input, Button, Space } from 'antd';
import TitleTab from './Components/TitleTab'
import AddTab from './Components/AddTab'
import DataList from './Components/DataList'

const { Header, Content }  = Layout;

const { Search } = Input;

const App = () => {

  const [data, setData] = useState([]);

  const handleAdd = (values) => {
    let timestamp = new Date().getTime();
    values["id"] = timestamp;
    values["createdAt"] = timestamp;
    values["isVisible"] = true;
    data.push(values);
    window.localStorage.setItem("data", JSON.stringify(data))
    setData(JSON.parse(JSON.stringify(data)));
  }

  const handleDelete = (id) => {
    let new_data = []
    data.forEach(element => {
      if (element.id != id) {
        new_data.push(element);
      }
    });
    window.localStorage.setItem("data", JSON.stringify(new_data))
    setData(new_data);
  }

  const handleUpdate = (item_id, values) => {
    data.forEach(element => {
      if (element.id == item_id) {
        element["title"] = values['title'];
        element["likeCount"] = values['likeCount'];
        element["imageURL"] = values['imageURL'];
      }
    });
    window.localStorage.setItem("data", JSON.stringify(data))
    setData(JSON.parse(JSON.stringify(data)));
  }

  useEffect(() => {
    let local_data = JSON.parse(window.localStorage.getItem("data"));
    if (local_data == null) {
      local_data = DUMMY
    }
    local_data.forEach(element => {
      element["isVisible"] = true;
    });
    window.localStorage.setItem("data", JSON.stringify(local_data))
    setData(local_data);
  }, []);

  const onSearch = (value) => {
    data.forEach(element => {
      if (element["title"].includes(value)) {
        element["isVisible"] = true;
      } else {
        element["isVisible"] = false;
      }
    });
    window.localStorage.setItem("data", JSON.stringify(data))
    setData(JSON.parse(JSON.stringify(data)));
  };

  const onReset = () => {
    data.forEach(element => {
      element["isVisible"] = true;
    });
    window.localStorage.setItem("data", JSON.stringify(data))
    setData(JSON.parse(JSON.stringify(data)));
  }

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <TitleTab/>
          &nbsp;
          &nbsp;
          &nbsp;
          <AddTab handleAdd={handleAdd}/>
        </Menu>
      </Header>
      <Content style={{background: "white"}}>
        <Space direction="horizontal">
          <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} />
          <Button key="search_clear" onClick={onReset}>
              Reset
          </Button>  
        </Space>
        <DataList data={data} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </Content>
    </Layout>
  );
};

export default App;
