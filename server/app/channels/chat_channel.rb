# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def index
    ActionCable.server.broadcast 'chat_channel', { messages: Message.serialize_all( Message.all ) }
  end

  def create( data )
    Message.create( name: data[ 'name' ], text: data[ 'text' ] );
    ActionCable.server.broadcast 'chat_channel', { messages: Message.serialize_all( Message.all ) }
  end

  def unsubscribed
  end
end
