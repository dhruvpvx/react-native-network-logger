import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useThemedStyles, Theme } from '../theme';

interface JSONTreeProps {
  data: any;
  level?: number;
  label?: string;
  defaultExpanded?: boolean;
}

const getType = (value: any): string => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

const JSONValue: React.FC<{ value: any }> = ({ value }) => {
  const styles = useThemedStyles(themedStyles);
  const type = getType(value);

  switch (type) {
    case 'string':
      return <Text style={styles.string}>"{value}"</Text>;
    case 'number':
      return <Text style={styles.number}>{String(value)}</Text>;
    case 'boolean':
      return <Text style={styles.boolean}>{String(value)}</Text>;
    case 'null':
      return <Text style={styles.null}>null</Text>;
    case 'undefined':
      return <Text style={styles.null}>undefined</Text>;
    default:
      return <Text style={styles.string}>{String(value)}</Text>;
  }
};

const JSONNode: React.FC<JSONTreeProps> = ({
  data,
  level = 0,
  label,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || level < 1);
  const styles = useThemedStyles(themedStyles);
  const type = getType(data);

  const isExpandable = type === 'object' || type === 'array';

  if (!isExpandable) {
    return (
      <View style={[styles.row, { paddingLeft: level * 16 }]}>
        {label !== undefined && (
          <Text style={styles.key}>{label}: </Text>
        )}
        <JSONValue value={data} />
      </View>
    );
  }

  const entries =
    type === 'array'
      ? (data as any[]).map((v, i) => [String(i), v] as const)
      : Object.entries(data as object);

  const bracket = type === 'array' ? ['[', ']'] : ['{', '}'];
  const count = entries.length;
  const preview =
    count === 0
      ? `${bracket[0]}${bracket[1]}`
      : `${count} ${count === 1 ? 'item' : 'items'}`;

  return (
    <View>
      <TouchableOpacity
        style={[styles.row, { paddingLeft: level * 16 }]}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.6}
      >
        <Text style={styles.arrow}>{expanded ? '▼ ' : '▶ '}</Text>
        {label !== undefined && (
          <Text style={styles.key}>{label}: </Text>
        )}
        {!expanded && <Text style={styles.preview}>{preview}</Text>}
        {expanded && (
          <Text style={styles.bracket}>{bracket[0]}</Text>
        )}
      </TouchableOpacity>
      {expanded && (
        <View>
          {entries.map(([key, value]) => (
            <JSONNode
              key={key}
              data={value}
              level={level + 1}
              label={key}
            />
          ))}
          <View style={[styles.row, { paddingLeft: level * 16 }]}>
            <Text style={styles.bracket}>{bracket[1]}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const JSONTree: React.FC<{ data: any }> = ({ data }) => {
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.container}>
      <JSONNode data={data} defaultExpanded />
    </View>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      paddingVertical: 2,
    },
    arrow: {
      color: theme.colors.muted,
      fontSize: 12,
      marginTop: 2,
    },
    key: {
      color: theme.colors.secondary,
      fontWeight: '600',
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    string: {
      color: theme.colors.statusGood,
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    number: {
      color: theme.colors.link,
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    boolean: {
      color: theme.colors.statusWarning,
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    null: {
      color: theme.colors.statusBad,
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    bracket: {
      color: theme.colors.text,
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    preview: {
      color: theme.colors.muted,
      fontSize: 13,
      fontStyle: 'italic',
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
  });

export default JSONTree;
