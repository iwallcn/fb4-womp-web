import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import CardList from './components/CardList';

const { Cell } = ResponsiveGrid;

const Services = () => {

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="产品与服务"
          breadcrumbs={[]}
          description="4PX产品与服务列表。"
        />
      </Cell>

      <Cell colSpan={12}>
        <CardList />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Services;
