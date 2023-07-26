import React, { useCallback, useEffect, useMemo, useState } from 'react'

const PeerContext = React.createContext(null)

export const usePeer = () => React.useContext(PeerContext)
export const PeerProvider = (props) => {

  const [remoteStream, setRemoteStream] = useState(null)
  const [addedTracks, setAddedTracks] = useState([]);
  const [isInitialOfferCreated, setIsInitialOfferCreated] = useState(false);


  const peer = useMemo(() => new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ]
      }
    ]
  }),
    []
  )

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer)
    setIsInitialOfferCreated(true);
    return offer;
  }

  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer)
    return answer
  }

  const setRemoteAns = async (ans) => {
    await peer.setRemoteDescription(ans)
  }

  const sendStream = async (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      const senders = peer.getSenders();
      const existingSender = senders.find((sender) => sender.track === track);
      if (!existingSender && !addedTracks.includes(track)) {
        peer.addTrack(track, stream);
        setAddedTracks((prev) => [...prev, track]);
      }
    }
  };

  const handleTrackEvent = useCallback((ev) => {
    const streams = ev.streams;
    setRemoteStream(streams[0])
  }, [])




  useEffect(() => {
    peer.addEventListener('track', handleTrackEvent)

    return () => {
      peer.removeEventListener('track', handleTrackEvent)

    }
  }, [handleTrackEvent, peer])

  return (
    <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream, isInitialOfferCreated }}>
      {props.children}
    </PeerContext.Provider>
  )
}
