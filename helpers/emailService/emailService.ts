/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import axios from 'axios'

export class MailService {
  /**
   *
   * @returns generated email address
   */
  public async generateRandomEmail(): Promise<string> {
    const response = await axios.post('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10')
    return response.data[0]
  }

  /**
   *
   * @param email for getting last email letter
   * @returns email letter
   */
  public async getLastEmail(email: string): Promise<string | null> {
    const domain = email.match(/@(.+)\b/)?.[1]
    const login = email.match(/^[^@]+/)?.[0]

    let response = 
      await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    while (response.data.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 3000))
      response = await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    }

    const messageId = response.data[0].id
    response = 
      await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${messageId}`)
    return response.data.body
  }

  /**
   *
   * @param email address
   * @param subject needed email letter subject
   * @returns email letter
   */
  public async getEmailWithSubject(email: string, subject: string): Promise<string | null> {
    const domain = email.match(/@(.+)\b/)?.[1]
    const login = email.match(/^[^@]+/)?.[0]

    let response = 
      await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    while (!response.data.map((email: { subject: unknown }) => email.subject).includes(subject)) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      response = await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    }

    const message = response.data.find((email: { subject: string }) => email.subject === subject)
    const messageId = message.id
    response = 
      await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${messageId}`)
    return response.data.body
  }

  /**
   *
   * @param email for getting all emails from inbox
   * @returns array of emails
   */
  public async getInbox(email: string): Promise<string[]> {
    const domain = email.match(/@(.+)\b/)?.[1]
    const login = email.match(/^[^@]+/)?.[0]

    const response = 
      await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    const messages = response.data
    const bodies = await Promise.all(
      messages.map(async (message: any) => {
        const messageResponse = 
          await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${message.id}`)
        return messageResponse.data.body
      })
    )
    return bodies
  }

  public async waitForNewEmail(email: string): Promise<void> {
    const domain = email.match(/@(.+)\b/)?.[1]
    const login = email.match(/^[^@]+/)?.[0]

    const firstResponse = 
      await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    let newLength = firstResponse.data.length
    while (newLength <= firstResponse.data.length) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      const response = 
        await axios.post(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
      newLength = response.data.length
    }
  }
}
