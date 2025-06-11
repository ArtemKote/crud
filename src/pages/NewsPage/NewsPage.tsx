import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Tag,
  Card,
  Row,
  Col,
  Flex,
  Typography,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { INewsItem } from '@/types/news';
import { NewsStorage } from '@/helpers/Storage';
import * as styles from './newsPage.module.scss';

export const NewsPage = () => {
  const storage = new NewsStorage();
  const [data, setData] = useState<INewsItem[]>(storage.getNewsList());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNews, setEditingNews] = useState<INewsItem | null>(null);
  const [form] = Form.useForm<INewsItem>();

  const addNewsHandler = () => {
    form.resetFields();
    setEditingNews(null);
    setIsModalVisible(true);
  };

  const editNewsHandler = (record: INewsItem) => {
    form.setFieldsValue(record);
    setEditingNews(record);
    setIsModalVisible(true);
  };

  const deleteNewsHandler = (id: string) => {
    storage.deleteNews(id);
    setData(storage.getNewsList());
    message.success('Новость удалена');
  };

  const submitHandler = () => {
    form
      .validateFields()
      .then(values => {
        if (editingNews) {
          storage.updateNews(editingNews.id, values);
          setData(storage.getNewsList());
          message.success('Новость обновлена');
        } else {
          const newNews = {
            ...values,
            date: new Date().toISOString().split('T')[0],
          };
          storage.addNews(newNews);
          setData(storage.getNewsList());
          message.success('Новость добавлена');
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const cancelHandler = () => {
    setIsModalVisible(false);
  };

  return (
    <Flex className={styles.newsPage}>
      <Flex className={styles.newsPage__addButton}>
        <Button type="primary" icon={<PlusOutlined />} onClick={addNewsHandler}>
          Добавить новость
        </Button>
      </Flex>
      <Row gutter={[16, 16]} className={styles.newsPage__list}>
        {data.map(item => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              className={styles.newsItem}
              styles={{ body: { padding: 0 } }}
              title={item.title}
              extra={<Tag color="blue">{item.category}</Tag>}
              actions={[
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => editNewsHandler(item)}
                  key="edit"
                />,
                <Popconfirm
                  title="Вы уверены, что хотите удалить эту новость?"
                  onConfirm={() => deleteNewsHandler(item.id)}
                  okText="Да"
                  cancelText="Нет"
                  key="delete"
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <Flex className={styles.newsItem__cardBody}>
                <Typography>{item.content}</Typography>
                <Flex className={styles.newsItem__date}>
                  <Typography.Text>{item.date}</Typography.Text>
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingNews ? 'Редактировать новость' : 'Добавить новость'}
        open={isModalVisible}
        onOk={submitHandler}
        onCancel={cancelHandler}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Заголовок"
            rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
          >
            <Input placeholder="Заголовок новости" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Содержание"
            rules={[{ required: true, message: 'Пожалуйста, введите содержание' }]}
          >
            <Input.TextArea rows={4} placeholder="Содержание новости" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Категория"
            rules={[{ required: true, message: 'Пожалуйста, выберите категорию' }]}
          >
            <Input placeholder="Категория новости" />
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};
