const AWS = require('aws-sdk');
const { validateContact } = require('../validators/validateContact');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: process.env.AWS_REGION || 'eu-north-1' });
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.DYNAMODB_TABLE || 'Contact_Form';

exports.createContact = async (req, res) => {
  try {
    const { error, value } = validateContact(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const item = {
      id: uuidv4(),
      name: value.name,
      email: value.email,
      phone: value.phone || null,
      message: value.message,
      createdAt: new Date().toISOString()
    };

    const params = { TableName: TABLE, Item: item };
    await dynamo.put(params).promise();

    return res.status(201).json({ message: 'Contact saved', item });
  } catch (err) {
    console.error('Error saving contact', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};