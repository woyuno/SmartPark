import { Card, Row, Col, Image, Radio, Spin } from 'antd'
import './room.scss'
import { useEffect, useState } from 'react'
import { getRoomList } from '../../api/room'
import { RadioChangeEvent } from 'antd/lib'
interface RoomType {
  roomNumber: number
  decorationType: '毛坯' | '精装'
  area: number
  unitPrice: number
  src: string
}
function Room() {
  const [visible, setVisible] = useState<boolean>()
  const [room, setRoom] = useState<RoomType[]>([])
  const [src, setSrc] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const loadRoom = async (buildingId: string) => {
    setLoading(true)
    const res: any = await getRoomList(buildingId)
    setLoading(false)
    setRoom(res.data.rooms)
  }
  useEffect(() => {
    loadRoom('a1')
  }, [])

  const handleChange = (e: RadioChangeEvent) => {
    const buildingId: string = e.target.value
    loadRoom(buildingId)
  }
  const showImage = (src: string) => {
    setSrc(src)
    setVisible(true)
  }
  return (
    <div className="room">
      <Image
        width={200}
        style={{ display: 'none' }}
        preview={{
          visible,
          src,
          onVisibleChange: (value) => {
            setVisible(value)
          },
        }}
      />
      <Card className="mb">
        <Radio.Group defaultValue="a1" buttonStyle="solid" onChange={handleChange}>
          <Radio.Button value="a1">A1写字楼</Radio.Button>
          <Radio.Button value="a2">A2写字楼</Radio.Button>
          <Radio.Button value="b1">B1写字楼</Radio.Button>
          <Radio.Button value="b2">B2写字楼</Radio.Button>
          <Radio.Button value="c1">C1写字楼</Radio.Button>
          <Radio.Button value="c2">C2写字楼</Radio.Button>
        </Radio.Group>
      </Card>
      <Spin spinning={loading}>
        <Row gutter={16}>
          {room.map((item) => {
            return (
              <Col span={6} className="item">
                <Card title="房间号" extra={<a onClick={() => showImage(item.src)}>户型图</a>}>
                  <h1>{item.roomNumber}</h1>
                  <div className="clearfix mt">
                    <p className="fl">装修情况</p>
                    <p className="fr">{item.decorationType}</p>
                  </div>
                  <div className="clearfix mt">
                    <p className="fl">房间面积</p>
                    <p className="fr">{item.area}</p>
                  </div>
                  <div className="clearfix mt">
                    <p className="fl">出租单价</p>
                    <p className="fr">{item.unitPrice}元/平/日</p>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Spin>
    </div>
  )
}
export default Room
