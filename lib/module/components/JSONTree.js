"use strict";

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useThemedStyles } from "../theme.js";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const getType = value => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};
const JSONValue = ({
  value
}) => {
  const styles = useThemedStyles(themedStyles);
  const type = getType(value);
  switch (type) {
    case 'string':
      return /*#__PURE__*/_jsxs(Text, {
        style: styles.string,
        children: ["\"", value, "\""]
      });
    case 'number':
      return /*#__PURE__*/_jsx(Text, {
        style: styles.number,
        children: String(value)
      });
    case 'boolean':
      return /*#__PURE__*/_jsx(Text, {
        style: styles.boolean,
        children: String(value)
      });
    case 'null':
      return /*#__PURE__*/_jsx(Text, {
        style: styles.null,
        children: "null"
      });
    case 'undefined':
      return /*#__PURE__*/_jsx(Text, {
        style: styles.null,
        children: "undefined"
      });
    default:
      return /*#__PURE__*/_jsx(Text, {
        style: styles.string,
        children: String(value)
      });
  }
};
const JSONNode = ({
  data,
  level = 0,
  label,
  defaultExpanded = false
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || level < 1);
  const styles = useThemedStyles(themedStyles);
  const type = getType(data);
  const isExpandable = type === 'object' || type === 'array';
  if (!isExpandable) {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.row, {
        paddingLeft: level * 16
      }],
      children: [label !== undefined && /*#__PURE__*/_jsxs(Text, {
        style: styles.key,
        children: [label, ": "]
      }), /*#__PURE__*/_jsx(JSONValue, {
        value: data
      })]
    });
  }
  const entries = type === 'array' ? data.map((v, i) => [String(i), v]) : Object.entries(data);
  const bracket = type === 'array' ? ['[', ']'] : ['{', '}'];
  const count = entries.length;
  const preview = count === 0 ? `${bracket[0]}${bracket[1]}` : `${count} ${count === 1 ? 'item' : 'items'}`;
  return /*#__PURE__*/_jsxs(View, {
    children: [/*#__PURE__*/_jsxs(TouchableOpacity, {
      style: [styles.row, {
        paddingLeft: level * 16
      }],
      onPress: () => setExpanded(!expanded),
      activeOpacity: 0.6,
      children: [/*#__PURE__*/_jsx(Text, {
        style: styles.arrow,
        children: expanded ? '▼ ' : '▶ '
      }), label !== undefined && /*#__PURE__*/_jsxs(Text, {
        style: styles.key,
        children: [label, ": "]
      }), !expanded && /*#__PURE__*/_jsx(Text, {
        style: styles.preview,
        children: preview
      }), expanded && /*#__PURE__*/_jsx(Text, {
        style: styles.bracket,
        children: bracket[0]
      })]
    }), expanded && /*#__PURE__*/_jsxs(View, {
      children: [entries.map(([key, value]) => /*#__PURE__*/_jsx(JSONNode, {
        data: value,
        level: level + 1,
        label: key
      }, key)), /*#__PURE__*/_jsx(View, {
        style: [styles.row, {
          paddingLeft: level * 16
        }],
        children: /*#__PURE__*/_jsx(Text, {
          style: styles.bracket,
          children: bracket[1]
        })
      })]
    })]
  });
};
const JSONTree = ({
  data
}) => {
  const styles = useThemedStyles(themedStyles);
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(JSONNode, {
      data: data,
      defaultExpanded: true
    })
  });
};
const themedStyles = theme => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingVertical: 2
  },
  arrow: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 2
  },
  key: {
    color: theme.colors.secondary,
    fontWeight: '600',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },
  string: {
    color: theme.colors.statusGood,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },
  number: {
    color: theme.colors.link,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },
  boolean: {
    color: theme.colors.statusWarning,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },
  null: {
    color: theme.colors.statusBad,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },
  bracket: {
    color: theme.colors.text,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },
  preview: {
    color: theme.colors.muted,
    fontSize: 13,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  }
});
export default JSONTree;
//# sourceMappingURL=JSONTree.js.map