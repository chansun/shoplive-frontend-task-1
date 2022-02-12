import React, { useState } from 'react';
import { Modal, Input, Form, Button } from 'antd';

const AddTab = ({handleAdd}) => {

  let formRef = React.createRef();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);
    handleAdd(values);
    formRef.current.resetFields();
  };

  return (
    <div onClick={showModal} className="nav_item" style={{textAlign: 'center', width: "80px", color: "white", fontWeight: "bold"}}>
      ADD
      <Modal title="Add Data" visible={isModalVisible} onCancel={handleCancel} footer={[
        <div key="button_addtab">
          <Button key="cancel_button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button key="submit_button" type="primary" form="myForm" htmlType="submit">
            Submit
          </Button>
        </div>
        ]}>
        <Form
          ref={formRef}
          id="myForm"
          name="basic"
          key="form_addtab"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            key="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="LikeCount"
            name="likeCount"
            key="like_count"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ImageURL"
            name="imageUrl"
            key="image_url"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTab;