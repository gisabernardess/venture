import NextLink from 'next/link';
import {
  Flex,
  Image,
  Box,
  Text,
  Stack,
  HStack,
  Heading,
  Button,
} from '@chakra-ui/react';
import { FaDiceD20, FaUserPlus, FaPlay } from 'react-icons/fa';
import { MdVideogameAsset } from 'react-icons/md';

import { Card, Footer, Header } from '../components';

export default function Home() {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex as="main" direction="column" w="100%" maxW={1200} mx="auto">
        <Flex w="100%" h="80vh">
          <Box my="15%">
            <Stack spacing={2}>
              <Heading as="h1">
                Your{' '}
                <Text as="span" color="red.500">
                  Friends
                </Text>
                .
              </Heading>
              <Heading as="h1">
                Your{' '}
                <Text as="span" color="red.500">
                  Games
                </Text>
                .
              </Heading>
              <Heading as="h1">
                Your{' '}
                <Text as="span" color="red.500">
                  Table
                </Text>
                .
              </Heading>
              <Text as="b">Organize your games. Play them with anyone.</Text>
            </Stack>
          </Box>
          <Box pos="absolute" top="20" right="28">
            <Image src="images/avatar.png" alt="Venture" />
          </Box>
        </Flex>
        <Stack w="100%" align="center" justify="center" spacing={10} py={10}>
          <Heading as="h1">How To Get Started</Heading>

          <Flex>
            <HStack>
              <Card
                icon={{ icon: FaDiceD20, color: 'red.500' }}
                title="Sign Up"
                description="Create your free account. Everything else is right in your browser - nothing to download or install."
              />
              <Card
                icon={{ icon: MdVideogameAsset, color: 'blue.400' }}
                title="Choose a Game"
                description="Build your own from scratch or join someone’s game."
              />
              <Card
                icon={{ icon: FaUserPlus, color: 'green.500' }}
                title="Invite Friends"
                description="Share a link with your existing group or find a new party with the Join a Game feature."
              />
              <Card
                icon={{ icon: FaPlay, color: 'red.500' }}
                title="Play"
                description="Start gaming! Have fun!"
              />
            </HStack>
          </Flex>

          <NextLink href="/signup" passHref>
            <Button as="a" size="lg" fontSize="sm" colorScheme="red">
              Create Free Account
            </Button>
          </NextLink>
        </Stack>
      </Flex>
      <Footer />
    </Flex>
  );
}
