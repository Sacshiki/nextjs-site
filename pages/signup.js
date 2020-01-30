import { Component } from 'react'
import Head from 'next/head'
import Header from '../components/header.js'
import Banner from '../components/banner.js'
import Footer from '../components/footer.js'
const { getGalleries, getGallery, getArticles } = require('../utils/strapi.js')

import { Form, Input, Select, Button, Radio } from 'antd';
import stylesheet from 'antd/dist/antd.min.css'

import 'isomorphic-fetch'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      submitted: false,
      articles: props.articles,
      galleries: props.galleries,
      bannerGallery: getGallery("hp-hero", props.galleries).slides,
      radioValue: 1,
    }
  }

  onRadioChange = (e) => {
    console.log("ONCHANGE");
    this.setState({
      radioValue: e.target.value,
    });
  };

  static async getInitialProps() {
    const articles = await getArticles();
    const galleries = await getGalleries();
    console.log("GET INITIAL================================");
    console.log(articles, galleries);
    return { articles, galleries };
  };

  submitForm (data) { // returns a Promise
    let url = "/api/addvolunteer";
    return fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const title = 'SignUp'
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div>
        <Header galleries={this.state.galleries} articles={this.state.articles} />
        <Banner images={this.state.bannerGallery} text={"Sign Up"}/>

        <div id="formWrapper">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="First Name">
              {getFieldDecorator('first_name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('last_name', {
                rules: [],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="How did you find out about us?">
              <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                <Radio style={radioStyle} value={1}>
                  Option A
                </Radio>
                <Radio style={radioStyle} value={2}>
                  Option B
                </Radio>
                <Radio style={radioStyle} value={3}>
                  Option C
                </Radio>
                <Radio style={radioStyle} value={4}>
                  More...
                  {this.state.radioValue === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Footer />

        <style jsx>{`
          #formWrapper {
            padding: 10px 90px 10px 90px;
          }
        `}</style>
      </div>
    );
  }
}


const SignUpForm = Form.create()(SignUp);
export default SignUpForm;
