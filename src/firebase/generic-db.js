import { isNil, keys, cloneDeep } from 'lodash'
import firebase from 'firebase/app'

import firestore from './async-firestore'

export default class GenericDB {
  constructor(collectionPath) {
    this.collectionPath = collectionPath
  }

  /**
   * Create a document in the collection
   * @async
   * @param data
   * @param id
   */
  async create(data, id = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

    const dataToCreate = {
      ...data,
      createTimestamp: serverTimestamp,
      updateTimestamp: serverTimestamp
    }

    const createPromise = isNil(id)
      ? // Create doc with generated id
        collectionRef.add(dataToCreate).then(doc => doc.id)
      : // Create doc with custom id
        collectionRef
          .doc(id)
          .set(dataToCreate)
          .then(() => id)

    const docId = await createPromise

    return {
      id: docId,
      ...data,
      createTimestamp: new Date(),
      updateTimestamp: new Date()
    }
  }

  /**
   * Read a document in the collection
   * @async
   * @param id
   */
  async read(id) {
    const result = await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .get()

    const data = result.exists ? result.data() : null

    if (isNil(data)) return null

    this.convertObjectTimestampPropertiesToDate(data)
    return { id, ...data }
  }

  /**
   * Read all documents in the collection following constraints
   * @async
   * @param constraints
   */
  async readAll(constraints = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    let query = collectionRef
    if (constraints) {
      constraints.forEach(constraint => {
        query = query.where(...constraint)
      })
    }

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      )

    return query.get().then(formatResult)
  }
  /**
   * Read documents in the collection following constraints with Where Condition
   * @async
   * @param constraints Array of where constrains
   */

  async readWhere(constraints) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    let query = collectionRef
    if (constraints) {
      constraints.forEach(constraint => {
        const { a, b, c } = constraint
        query = query.where(a, b, c)
      })
    } else {
      throw new Error('Missing Constraints, check readWhere function')
    }

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      )

    return query.get().then(formatResult)
  }

  /**
   * Update a document in the collection
   * @async
   * @param data
   */
  async update(data) {
    const { id } = data
    const clonedData = cloneDeep(data)
    delete clonedData.id

    await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .update({
        ...clonedData,
        updateTimestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    return id
  }

  /**
   * Delete a document in the collection
   * @async
   * @param id
   */
  async delete(id) {
    return (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .delete()
  }

  /**
   * Convert all object Timestamp properties to date
   * @async
   * @param obj
   */
  convertObjectTimestampPropertiesToDate(obj) {
    const newObj = {}

    keys(obj)
      .filter(prop => obj[prop] instanceof Object)
      .forEach(prop => {
        if (obj[prop] instanceof firebase.firestore.Timestamp) {
          newObj[prop] = obj[prop].toDate()
        } else {
          this.convertObjectTimestampPropertiesToDate(obj[prop])
        }
      })

    return {
      ...obj,
      newObj
    }
  }
}
