'use client';
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/reset.css';

const SignUpForm: React.FC = () => {
  const onFinish = async (values: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        message.error(errorData.error || 'Sign in failed');
      } else {
        const data = await response.json();
        message.success('Sign in successful');
        console.log('Received values:', data);
      }
    } catch (error) {
      message.error('An error occurred while signing in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Sign Up
        </h1>
        <Form
          name="signUp"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ remember: true }}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}>
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}>
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>

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

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}>
            <Input.Password className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
