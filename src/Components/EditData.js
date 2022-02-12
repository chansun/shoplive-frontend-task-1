import React, { useState } from 'react';
import { Modal, Input, Form, Button } from 'antd';

const EditData = ({handleUpdate, item}) => {
  
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
    handleUpdate(item.id, values);
  };

  return (
    <>
    <span onClick={showModal} className="edit_item" stlye={{cursor: "pointer"}} key="edit_item">
      edit
    </span>
    <Modal 
      title="Edit Data" 
      visible={isModalVisible} 
      onCancel={handleCancel} 
      footer={[
      <div key="button_addtab">
        <Button key="cancel_button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button key="submit_button" type="primary" form={`form_${item.id}`} htmlType="submit">
          Submit
        </Button>
      </div>]}
    >
      <Form
        ref={formRef}
        id={`form_${item.id}`}
        name="basic"
        key="form_addtab"
        labelCol={{
            span: 5,
        }}
        wrapperCol={{
            span: 18,
        }}
        initialValues={{
          title: item.title,
          likeCount: item.likeCount,
          imageUrl: item.imageUrl
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
            },]}
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
            },]}
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
            },]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
    </>
  );
};

export default EditData;