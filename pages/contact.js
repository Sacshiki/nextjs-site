import { Component } from 'react'
import Head from 'next/head'
import 'isomorphic-fetch'

import { Form, Input, Progress, Layout } from 'antd';

class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      submitted: false
    }
  }
  submitForm (data) {
    fetch('/api/contact', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      res.status === 200 ? this.setState({ submitted: true }) : ''
    })
  }
  render () {
    const title = 'Connect with us'
    return (
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        <div id='container' className='contact'>
          <div>
            <div>
              <Form onSubmit={e => {
                    e.preventDefault()
                    validateForm() && this.submitForm(getPayload())
                  }}>
                  <Form.Item>
                    <h2>Contact</h2>
                    <div className="f fw grid-row--s">
                      <div className="mb1 pb05">
                        <Input name="name" label="Name" required />
                      </div>
                      <div className="mb1 pb05">
                        <Input name="email" label="Email" required />
                      </div>
                    </div>

                    <Progress
                      className="button green"
                      formNoValidate={true}
                      inProgress={this.state.submitting}
                      inProgressText='Submitting'
                      isDone={this.state.submitted}
                      isDoneText='Submitted'>
                      Submit Form
                    </Progress>

                  </Form.Item >
            </Form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Contact