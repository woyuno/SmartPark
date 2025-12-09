import { Card, Row, Col, Input, Button, Table, Pagination, Tag, Popconfirm, message, TableProps } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { DataType } from './interface/users'
import { getUserList } from '../../api/userList'
import type { PaginationProps } from 'antd'
import { deleteUser, batchDeleteUser } from '../../api/userList'
import UserForm from './userForm'
import { userStore } from '../../store/userStore'

interface SearchType {
  companyName: string
  contact: string
  phone: string
}

function Users() {
  const [dataList, setDataList] = useState<DataType[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [formData, setFormData] = useState<SearchType>({
    companyName: '',
    contact: '',
    phone: '',
  })
  const disabled = useMemo(() => {
    return selectedRowKeys.length ? false : true
  }, [selectedRowKeys])
  const { setUserDataStore } = userStore((state) => state)

  useEffect(() => {
    loadData()
  }, [page, pageSize])
  const loadData = async () => {
    setLoading(true)
    const {
      data: { list, total },
    } = await getUserList({ ...formData, page, pageSize })
    setLoading(false)
    setDataList(list)
    setTotal(total)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }))
  }
  const onSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const reset = () => {
    setSelectedRowKeys([])
    setFormData({
      companyName: '',
      contact: '',
      phone: '',
    })
    setPage(1)
    setPageSize(10)
    loadData()
  }
  const confirm = async function (id: string) {
    const { data } = await deleteUser(id)
    message.success(data)
    loadData()
  }
  const batchDelete = async function () {
    const { data } = await batchDeleteUser(selectedRowKeys)
    message.success(data)
    loadData()
  }
  const edit = (record: DataType) => {
    setIsModalOpen(true)
    setTitle('编辑企业')
    setUserDataStore(record)
  }
  const add = () => {
    setIsModalOpen(true)
    setTitle('新增企业')
    setUserDataStore({})
  }
  // const hideModal = () => {
  //   setIsModalOpen(false)
  // }
  const hideModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(value, record, index) {
        return index + 1
      },
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      key: 'status',
      render(value) {
        if (value === '1') {
          return (
            <Tag color="green" variant="solid">
              营业中
            </Tag>
          )
        } else if (value === '2') {
          return (
            <Tag color="#f50" variant="solid">
              暂停营业
            </Tag>
          )
        } else if (value === '3') {
          return (
            <Tag color="red" variant="solid">
              已关闭
            </Tag>
          )
        }
      },
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '所属行业',
      dataIndex: 'business',
      key: 'business',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '统一信用代码',
      dataIndex: 'creditCode',
      key: 'creditCode',
    },
    {
      title: '工商注册号',
      dataIndex: 'industryNum',
      key: 'industryNum',
    },
    {
      title: '组织机构代码',
      dataIndex: 'organizationCode',
      key: 'organizationCode',
    },
    {
      title: '法人名',
      dataIndex: 'legalPerson',
      key: 'legalPerson',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render(value, record, index) {
        return (
          <>
            <Button type="primary" onClick={() => edit(record)}>
              编辑
            </Button>
            <Popconfirm
              title="确定删除吗"
              onConfirm={() => confirm(record.id)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger className="ml">
                删除
              </Button>
            </Popconfirm>
          </>
        )
      },
    },
  ]
  return (
    <div className="users">
      <MyUserForm visible={isModalOpen} hideModal={hideModal} title={title} loadData={loadData}/>
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>企业名称：</p>
            <Input name="companyName" value={formData.companyName} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系人：</p>
            <Input name="contact" value={formData.contact} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系电话：</p>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={loadData}>
              查询
            </Button>
            <Button className="ml" onClick={reset}>
              重置
            </Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt tr">
        <Button type="primary" onClick={add}>
          新增企业
        </Button>
        <Button type="primary" danger className="ml" disabled={disabled} onClick={batchDelete}>
          批量删除
        </Button>
      </Card>
      <Card className="mt">
        <Table dataSource={dataList} columns={columns} rowKey={(record) => record.id} loading={loading} rowSelection={rowSelection} pagination={false} />
        <Pagination className="fr mt" total={total} current={page} pageSize={pageSize} showSizeChanger showQuickJumper showTotal={(total) => `共 ${total} 条`} onChange={onChange} />
      </Card>
    </div>
  )
}
const MyUserForm = React.memo(UserForm)
export default Users
