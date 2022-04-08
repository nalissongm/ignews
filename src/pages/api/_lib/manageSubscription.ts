import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAtion = false,
) {
  
  /**
   * Buscar referencia do usuário
   */
  const userRef = await fauna.query(
    q.Select("ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  );

  /**
   * Retorna todos os dados de um subscription
   */
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if(createAtion){
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        {
          data: subscriptionData
        },
      )
    );
  }else {
    console.log(subscription.id);
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscription.id,
            )
          )
        ),
        {
          data: subscriptionData
        }
      )
    );
  }
}
