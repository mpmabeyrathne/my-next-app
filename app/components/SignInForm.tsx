'use client';
import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';

const SignInForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Sign In
        </h1>
        <Form
          name="signIn"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ remember: true }}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
