import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from '../styles/icons.module.css';

interface Props {
  falseIcon: ReactNode;
  trueIcon: ReactNode;
  onClick(): void;
  state: boolean;
  sx?: object;
  inheritColor?: boolean;
}
function AnimatedIcon(props: Props) {
  const { falseIcon, trueIcon, onClick, state, sx, inheritColor } = props;

  function handleClick() {
    onClick();
  }
  return (
    <Box sx={sx}>
      <AnimatePresence>
        <IconButton
          color={inheritColor ? 'inherit' : 'default'}
          onClick={handleClick}
        >
          {state && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.icon}
            >
              {trueIcon}
            </motion.span>
          )}
          {!state && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.icon}
            >
              {falseIcon}
            </motion.span>
          )}
        </IconButton>
      </AnimatePresence>
    </Box>
  );
}

export default AnimatedIcon;
