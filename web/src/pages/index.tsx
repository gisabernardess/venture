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
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaDiceD20, FaUserPlus, FaPlay } from 'react-icons/fa';
import { MdVideogameAsset } from 'react-icons/md';

import { Card, Footer, Header, SEO } from '../components';

export default function Home() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <>
      <SEO title="Home" image="cover.png" />
      <Flex direction="column" minH="100vh" border="1px solid yellow">
        <Header />
        <Flex as="main" direction="column" w="100%" maxW={1200} mx="auto">
          <Flex w="100%" h={{ base: 'auto', lg: '65vh' }} pos="relative">
            <Box
              w={['100%', '50%']}
              my={['4', '15%']}
              px={['0', '2rem']}
              textAlign={['center', 'left']}
            >
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
            {!isMobile && (
              <Box w={{ md: '75%' }} pos="absolute" right="0">
                <Image src="images/avatar.png" alt="Venture" />
              </Box>
            )}
          </Flex>
          <Stack w="100%" align="center" justify="center" spacing={10} py={7}>
            <Heading as="h1">How To Get Started</Heading>

            <Flex>
              <Stack direction={{ base: 'column', lg: 'row' }}>
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
              </Stack>
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
    </>
  );
}
