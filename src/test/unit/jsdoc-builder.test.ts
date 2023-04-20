import * as assert from 'assert';
import { JSDocBuilder } from '../../utils/jsdoc-builder';

const DESCRIPTION_ONLY_CASE_RESULT = `/**
 * test description
 */`;

const PARAM_CASE_RESULT = `/**
 * test description
 * @param {string} param1 param1 description
 * @param {number} param2 param2 description
 */`;

const RETURNS_CASE_RESULT = `/**
 * test description
 * @returns {string} returns description
 */`;

const FULL_CASE_RESULT = `/**
 * test description
 * @param {string} param1 param1 description
 * @returns {string} returns description
 */`;

suite('JSDocBuilder', () => {
  test('description only', () => {
    const bd = new JSDocBuilder();
    bd.addBlock({
      blockType: 'description',
      description: 'test description'
    });
    const result = bd.build();
    assert.strictEqual(result, DESCRIPTION_ONLY_CASE_RESULT);
  });

  test('blocks', () => {
    const bd = new JSDocBuilder();
    bd
    .addBlock({
      blockType: 'description',
      description: 'test description'
    })
    .addBlock({
      blockType: 'param',
      name: 'param1',
      type: 'string',
      description: 'param1 description',
    })
    .addBlock({
      blockType: 'param',
      name: 'param2',
      type: 'number',
      description: 'param2 description',
    });
    const result = bd.build();
    assert.strictEqual(result, PARAM_CASE_RESULT);
  });

  test('blocks', () => {
    const bd = new JSDocBuilder();
    bd
    .addBlock({
      blockType: 'description',
      description: 'test description'
    })
    .addBlock({
      blockType: 'returns',
      type: 'string',
      description: 'returns description',
    });
    const result = bd.build();
    assert.strictEqual(result, RETURNS_CASE_RESULT);
  });

  test('full', () => {
    const bd = new JSDocBuilder();
    bd
    .addBlock({
      blockType: 'description',
      description: 'test description'
    })
    .addBlock({
      blockType: 'param',
      name: 'param1',
      type: 'string',
      description: 'param1 description',
    })
    .addBlock({
      blockType: 'returns',
      type: 'string',
      description: 'returns description',
    });
    const result = bd.build();
    assert.strictEqual(result, FULL_CASE_RESULT);
  });
});