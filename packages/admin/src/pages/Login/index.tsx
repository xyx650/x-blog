import React, { useState } from 'react'
import { useRequest } from '@@/plugin-request'
import { history, useSearchParams } from '@umijs/max'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined
} from '@ant-design/icons'
import { LoginFormPage, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'

import { Divider, message, Space, Tabs, theme } from 'antd'

import { login } from '@/api'
import styles from './index.less'

export enum LoginType {
  PHONE = 'PHONE',
  ACCOUNT = 'ACCOUNT'
}


const LoginPage: React.FC = () => {
  const { token } = theme.useToken()
  const [loginType, setLoginType] = useState<LoginType>(LoginType.ACCOUNT)


  const statusRender = (value?: string) => {
    return value && value.length > 12
      ? (
        <div style={ { color: token.colorSuccess } }>强度：强</div>
      )
      : value && value.length > 6
        ? (
          <div style={ { color: token.colorWarning } }>强度：中</div>
        )
        : (
          <div style={ { color: token.colorError } }>强度：弱</div>
        )
  }

  const TabsForm = loginType === LoginType.ACCOUNT
    ? (
      <>
        <ProFormText
          name="username"
          fieldProps={ {
            size: 'large',
            prefix: <UserOutlined className={ 'prefixIcon' }/>
          } }
          placeholder={ '用户名: admin or user' }
          rules={ [
            { required: true, message: '请输入用户名!' }
          ] }
        />
        <ProFormText.Password
          name="password"
          fieldProps={ {
            size: 'large',
            prefix: <LockOutlined className={ 'prefixIcon' }/>,
            strengthText: 'Password should contain numbers, letters and special characters, at least 8 characters long.',
            statusRender
          } }
          placeholder={ '密码: ant.design' }
          rules={ [
            { required: true, message: '请输入密码！' }
          ] }
        />
      </>
    )
    : (
      <>
        <ProFormText
          fieldProps={ {
            size: 'large',
            prefix: <MobileOutlined className={ 'prefixIcon' }/>
          } }
          name="mobile"
          placeholder={ '手机号' }
          rules={ [
            { required: true, message: '请输入手机号！' },
            { pattern: /^1\d{10}$/, message: '手机号格式错误！' }
          ] }
        />
        <ProFormCaptcha
          fieldProps={ {
            size: 'large',
            prefix: <LockOutlined className={ 'prefixIcon' }/>
          } }
          captchaProps={ { size: 'large' } }
          placeholder={ '请输入验证码' }
          captchaTextRender={ (timing, count) => timing ? `${ count } ${ '后获取验证码' }` : '获取验证码' }
          name="captcha"
          rules={ [
            { required: true, message: '请输入验证码！' }
          ] }
          onGetCaptcha={ async () => {
            message.success('获取验证码成功！验证码为：1234')
          } }
        />
      </>
    )

  const iconWrapperStyles: React.CSSProperties = { border: '1px solid ' + token.colorPrimaryBorder }

  const handleIconClick = async () => {
    // TODO
    message.info('暂未开通～')
  }


  const actions = (
    <div className={styles.actions}>
      <Divider plain>
        <span className={styles.other} style={ { color: token.colorTextPlaceholder } }>
          其他登录方式
        </span>
      </Divider>
      <Space align="center" size={ 24 }>
        <div className={styles['icon-wrapper']} style={ iconWrapperStyles }>
          <AlipayOutlined className={styles.icon} style={ { color: '#1677FF' } } onClick={ handleIconClick }/>
        </div>
        <div className={styles['icon-wrapper']} style={ iconWrapperStyles }>
          <TaobaoOutlined className={styles.icon} style={ { color: '#FF6A10' } } onClick={ handleIconClick }/>
        </div>
        <div className={styles['icon-wrapper']} style={ iconWrapperStyles }>
          <WeiboOutlined className={styles.icon} style={ { color: '#1890ff' } } onClick={ handleIconClick }/>
        </div>
      </Space>
    </div>
  )

  const onFinish = async (formData: Omit<ILoginPropsDto, 'type'>) => {
    if (loginType === LoginType.PHONE) {
      return message.info('暂未支持手机登录')
    }
    // const { loading, data, error } = useRequest(() => login({
    //   ...formData,
    //   type: LoginType.ACCOUNT
    // }))
    const [query] = useSearchParams()
    history.push(query.get('redirect') || '/')
  }

  return (
    <div className={styles.container}>
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="X-BLOG"
        subTitle="X-BLOG 博客管理后台"
        actions={ actions }
        onFinish={ onFinish }
      >
        <Tabs
          centered
          size="large"
          activeKey={ loginType }
          onChange={ (activeKey: string) => setLoginType(activeKey as LoginType) }
        >
          <Tabs.TabPane key={ LoginType.ACCOUNT } tab={ '账号密码登录' }/>
          <Tabs.TabPane key={ LoginType.PHONE } tab={ '手机号登录' }/>
        </Tabs>
        { TabsForm }
        <div style={ { marginBlockEnd: 24 } }>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  )
}


export default LoginPage

