import React, { useEffect, useState } from 'react';
import { useParams } from 'ice';
import { ResponsiveGrid, Box, Card, Form } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import api from './api';

const { Cell } = ResponsiveGrid;

const BasicDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  // 先获取详情
  useEffect(() => {
    api.getDetail(id).then((res) => {
      setItem(res.value)
    })
  }, []);

  // 先处理数据，然后再渲染模板
  const handlerItem = () => {
    if (!Object.keys(item).length) {
      return '';
    }
    return Object.keys(item).map(_key => {
      if (_key == 'logisticsBaseDTO') { // 基本信息
        let base = item['logisticsBaseDTO']
        let obj = {
          '4PX单号': base['fpxTrackingNo'],
          '服务商单号': base['deliveryNo'],
          '客户单号': base['customerHawbCode'],
          '产品': base['productCode'],
          '包裹状态': base['orderStatus'],
          '支付状态': base['payFlag'],
          '起运地': base['departure'],
          '目的地': base['destination'],
          '订单创建时间': base['createTime'],
          '是否带电': base['isIncludeBattery'],
          '货物类型': base['cargoType'],
          '体积': base['volume'],
          '预报重量(g)': base['preWeight'],
          '实际重量(g)': base['grossWeight'],
          '增值服务': base['addService'],
        }
        return renderCard('基础信息', obj);
      } else if (_key == 'logisticsSenderDTO') { // 发件人
        let base = item['logisticsSenderDTO']
        let obj = {
          '姓名': base['firstName'],
          '客户代码': base['customerCode'],
          '电话': base['mobile'],
          '国家/地区': base['countryCode'],
          '省': base['province'],
          '市': base['city'],
          '区/县': base['district'],
          '详细地址': base['address'],
          '邮编': base['postCode']
        }
        return renderCard('发件人', obj);
      } else if (_key == 'logisticsReceiveDTO') { // 收件人
        let base = item['logisticsReceiveDTO']
        let obj = {
          '姓名': base['firstName'],
          '姓': base['firstName'],
          '名': base['lastName'],
          '国家/地区': base['countryCode'],
          '洲/省': base['province'],
          '市': base['city'],
          '区/县': base['district'],
          '详细地址': base['address'],
          '邮编': base['postCode'],
          '电话': base['moblie'],
          '邮箱': base['logisticsReceiveDTO'],
          '税号': base['logisticsReceiveDTO']
        }
        return renderCard('收件人', obj);
      }
      return;
    });
  }

  // 渲染详情面板
  const renderCard = (title, obj) => {
    return (
      <Card free>
        <Card.Header title={title} />
        <Card.Divider />
        <Card.Content>
          <Form labelAlign="top" responsive>
            {Object.keys(obj).map((key, index) => {
              return (
                <Form.Item colSpan={4} label={key} key={index}>
                  <span>{obj[key]}</span>
                </Form.Item>
              )
            })}
          </Form>
        </Card.Content>
      </Card>
    )
  }

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '委托单调度中心' }, { name: '包裹详情' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <Box spacing={20}>
          {handlerItem()}
        </Box>
      </Cell>
    </ResponsiveGrid>
  );
};

export default BasicDetailPage;
