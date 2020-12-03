import { Component } from 'react'
import Head from 'next/head'
import Header from '../components/header.js'
import Banner from '../components/banner.js'
import Footer from '../components/footer.js'
const { getGalleries, getGallery, getArticles } = require('../utils/strapi.js')

import { Form, Input, Select, Button, Radio, Checkbox, notification } from 'antd';
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

    notification.config({
      placement: 'topright',
      top: 40,
      duration: 2,
    });
  }

  static async getInitialProps() {
    const articles = await getArticles();
    const galleries = await getGalleries();
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitting: true });
        // parse and clean results
        if (values.how_they_found_out == "other") {
          values.how_they_found_out = values.found_out_other;
        }
        values.interests = values.interests.join(", ")
        // make the api call
        this.submitForm(values).then((res) => {
          let success = false;
          if (res.status === 200) {
            console.log("sign up success")
            success = true;
            notification.success({
              message: "Sign-Up Success!",
              description: `Thank you for signing up for Sacshiki. We'll be in touch.`,
            });
          } else {
            console.log("error on signup")
            notification.error({
              message: "An error occurred",
              description: `Something went wrong. Please try again`,
            });
          }
          this.setState({ submitting: false, submitted: success });
          this.props.form.resetFields()

        });
      } else {
        return;
      }
    });
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
    const buttonState = this.state.submitting ?
      "submitting" : (this.state.submitted ?
      "submitted" :
      "default");
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
            <Form.Item label="Interests">
              {getFieldDecorator('interests', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your interests!',
                  },
                ]}
              )(
                <Checkbox.Group options={['General Updates', 'Volunteering', 'Sewing']} />
              )}
            </Form.Item>
            <Form.Item label="How did you find out about us?">
              {getFieldDecorator('how_they_found_out')(
                <Radio.Group>
                  <Radio style={radioStyle} value={"flyer"}>
                    Flyer
                  </Radio>
                  <Radio style={radioStyle} value={"word_of_mouth"}>
                    Word of Mouth
                  </Radio>
                  <Radio style={radioStyle} value={"forage_garden"}>
                    Forage Garden
                  </Radio>
                  <Radio style={radioStyle} value={"social_media"}>
                    Social Media
                  </Radio>
                  <Radio style={radioStyle} value={"east_bay_express"}>
                    East Bay Express
                  </Radio>
                  <Radio style={radioStyle} value={"other"}>
                    Other...
                    { this.props.form.getFieldValue("how_they_found_out") === "other" ?
                      getFieldDecorator('found_out_other')(
                        <Input style={{ width: 100, marginLeft: 10 }}/>
                      ) : null }
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              { buttonState === "default" || buttonState === "submitted" ?
                <Button type="primary" htmlType="submit">
                  Register
                </Button> : null }
              { buttonState === "submitting" ?
                <div className="submit" id="submitting"> Submitting </div> : null }
            </Form.Item>
          </Form>
        </div>
        <Footer />

        <style jsx>{`
          #formWrapper {
            padding: 10px 90px 10px 90px;
          }
          @media only screen and (max-width: 650px) {
            #formWrapper {
              padding: 10px 20px 10px 20px;
            }
          }
          .submit {
            border-radius: 4px;
            border: 1px solid #171717;
            width: 100px;
            text-align: center;
            font-weight: bold;
          }
          #submitting {
            color: white;
            background: #171717;
          }
          #submitted {
            color: #171717;
            background: white;
          }
        `}</style>
        
      </div>
    );
  }
}


const SignUpForm = Form.create()(SignUp);
export default SignUpForm;
